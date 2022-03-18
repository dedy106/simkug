window.app_saku3_transaksi_siaga_gar_fAppRRA3multi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_gar_fAppRRA3multi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_gar_fAppRRA3multi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval RRA : Multi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Approval",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Data Reprogramming","Detail Reprogramming"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		        colTitle:["Status","Detail","Lokasi","PP","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,220,80,100,100,150,80,70,60]],
				buttonStyle:[[0,1],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","USUL"]})]],checkItem:true,
				colFormat:[[1],[cfButton]], change:[this,"doChangeCells"],
				click:[this,"doSgBtnClick"], colAlign:[[1],[alCenter]],
				readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.i_app = new portalui_imageButton(this.sgn,{bound:[965,1,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doApp"]});

		this.e_nopdrk = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"No Usulan",tag:9,readOnly:true});		
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,17,450,20],caption:"", labelWidth:0,tag:9, readOnly:true});		

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:5,tag:9,
					colTitle:["Bulan","Kode Akun","Nama Akun","Jenis","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,300,100,80]],
					columnReadOnly:[true,[0,1,2,3,4],[]],
					colFormat:[[4],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
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
window.app_saku3_transaksi_siaga_gar_fAppRRA3multi.extend(window.childForm);
window.app_saku3_transaksi_siaga_gar_fAppRRA3multi.implement({
	doApp: function() {
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			this.dataJU.rs.rows[i].status = "APP";
		}
		this.doTampilData(this.page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 1) {
				if (this.sg.cells(1,row) != "") {
					this.e_nopdrk.setText(this.sg.cells(4,row));
					this.e_ket2.setText(this.sg.cells(7,row));
					this.sg2.clear();
					var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc  "+
								 "from rra_pdrk_d a "+
								 "		inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						 
								 "where a.no_pdrk = '"+this.e_nopdrk.getText()+"'  order by a.dc";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData([line.bulan,line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai)]);
						}
					} else this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
				}
			}
		}catch(e){
			alert(e);
		}
	},	
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
					
					var vProg = "0"; 
					sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','PUSAT','"+this.e_periode.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'DIRMULTI')");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {							
							sql.add("insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values "+
									"('"+this.e_nb.getText()+"','DIRMULTI','"+this.app._lokasi+"','"+this.sg.cells(4,i)+"','"+this.app._lokasi+"','RRR','-','APPROVE')");
							sql.add("update rra_pdrk_m set progress='"+vProg+"' where no_pdrk='"+this.sg.cells(4,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}

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
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.doLoad();
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
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		
		this.doClick(this.i_gen);
		this.doLoad();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app",this.app._lokasi+"-RRA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},	
	doLoad:function(sender){							 
		var strSQL =  "select 'USUL' as status,a.kode_lokasi,a.kode_pp+' - '+c.nama as pp,a.no_pdrk as no_bukti,b.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.sts_pdrk as jenis "+
					"from rra_pdrk_m a "+
					"    inner join anggaran_m b on a.no_pdrk=b.no_agg and a.kode_lokasi=b.kode_lokasi "+
					"    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					"where a.modul = 'MULTI' and a.progress in ('9') and a.periode<='"+this.e_periode.getText()+"' and a.nik_app2='"+this.app._userLog+"'";							
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);					
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),"Detail",line.kode_lokasi,line.pp,line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase()]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "USUL") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"USUL");
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							// this.nama_report = "server_report_saku3_siaga_rptAggApp";
							// this.nama_report = "server_report_saku3_siaga_rptAppRRA2";
							// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
							// this.filter2 = this.app._lokasi+"/"+this.app._userLog+"/"+this.e_nb.getText()+"/"+this.c_status.getText()+"/Approval VP"+"/"+this.app._kodePP+"/"+this.e_nopdrk.getText();
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							// this.viewer.useIframe(this.report.previewWithBs(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
							this.viewer.useIframe(this.report.previewWithBs(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
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
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doLoad();
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	}	
});
