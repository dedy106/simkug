window.app_saku3_transaksi_gar_fTransferTM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gar_fTransferTM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gar_fTransferTM";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval RRA PUSAT: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Detail Data"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,202,20],caption:"No Approval",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.bLoad = new button(this.pc1.childPage[0],{bound:[860,17,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,320],colCount:7,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,200,80,200,80,200,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					colFormat:[[6],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gar_fTransferTM.extend(window.childForm);
window.app_saku3_transaksi_gar_fTransferTM.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{									
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{				
					this.doClick(this.i_gen);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','PST-TM','"+this.e_periode.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'PST-TM')");
					sql.add("delete from dbtm.dbo.anggaran_d where kode_akun in ( "+
							"        select distinct akun_tm from xakuntm "+
							"       ) and periode like '"+this.e_periode.getText().substr(0,4)+"%'");

					sql.add("insert into dbtm.dbo.anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai,nilai_sat,dc,satuan,tgl_input,nik_user,modul,nilai_kas,no_sukka) "+
							"select a.no_agg,a.kode_lokasi,a.no_urut,a.kode_pp,b.akun_tm,a.kode_drk,a.volume,a.periode,sum(a.nilai),sum(a.nilai_sat),a.dc,a.satuan,a.tgl_input,a.nik_user,a.modul,sum(a.nilai_kas),'"+this.e_nb.getText()+"' "+
							"from anggaran_d a inner join xakuntm b on a.kode_akun=b.akun_yakes "+
							"where a.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+
							"group by a.no_agg,a.kode_lokasi,a.no_urut,a.kode_pp,b.akun_tm,a.kode_drk,a.volume,a.periode,a.dc,a.satuan,a.tgl_input,a.nik_user,a.modul,a.no_sukka");
								
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		this.doClick(this.i_gen);		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app",this.app._lokasi+"-TTM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},	
	doLoad:function(sender){		
		var strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,c.nama as nama_akun,d.nama as nama_pp,e.nama as nama_drk,sum(case a.dc when 'D' then a.nilai else -nilai end) as total "+
		             "from anggaran_d a inner join xakuntm b on b.akun_yakes=a.kode_akun "+
					 "             inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "             inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					 "             inner join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi "+
					 "where a.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+
					 "group by a.kode_akun,a.kode_pp,a.kode_drk,c.nama,d.nama,e.nama";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.total)]);
			}
		} else this.sg2.clear(1);
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
							this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
							this.filter2 = "";
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();															
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	}	
});
