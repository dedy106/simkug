window.app_saku3_transaksi_fitnes_fFinalMedis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fFinalMedis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fFinalMedis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Medis", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Finalisasi"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,400,20],caption:"Nama", readOnly:true});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,340], childPage:["Daftar Kunjungan","Data Pengukuran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:0,
		            colTitle:["No Kunj","Periode","Tanggal","Jam","No Final"],
					colWidth:[[4,3,2,1,0],[200,100,100,80,200]],					
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});						
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama Parameter","Satuan","Pengukuran Awal","Pengukuran Akhir"],
					colWidth:[[4,3,2,1,0],[200,200,100,200,100]],					
					columnReadOnly:[true,[0,1,2],[3,4]],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
						
			this.cb_agg.setSQL("select kode_agg,nama from fi_anggota where kode_pp='"+this.app._kodePP+"' and kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","nama"],false,["ID Peserta","Nama"],"and","Data Peserta",true);			
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fFinalMedis.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fFinalMedis.implement({	
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var data = this.dbLib.getDataProvider("select no_final,tanggal from fi_kunj_m where no_kunj = '"+this.noKunj+"' and kode_lokasi ='"+this.app._lokasi+"'",true);												
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];													
						this.e_nb.setText(line.no_final);	
						this.dp_d1.setText(line.tanggal);									
					} 		
					if (this.e_nb.getText() == "-") {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_kunj_final","no_final",this.app._lokasi+"-FL"+this.e_periode.getText().substr(2,4)+".","0000"));										
						sql.add("insert into fi_kunj_final(no_final,tanggal,kode_lokasi,periode,nik_user,tgl_input,no_kunj,kode_pp) values "+
					        	"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.noKunj+"','"+this.app._kodePP+"')");										
					}
					sql.add("update fi_kunj_m set no_final='"+this.e_nb.getText()+"' where no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++) {
							if (this.sg1.rowValid(i)){
								sql.add("update fi_kunj_d set hasil_bef='"+this.sg1.cells(3,i)+"',hasil_aft='"+this.sg1.cells(4,i)+"' where kode_param='"+this.sg1.cells(0,i)+"' and no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
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
					this.sg1.clear(1); this.sg.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbSimpan);						
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";				
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
	},
	doChange:function(sender){
		if (sender == this.cb_agg && this.cb_agg.getText()!="") {					   
			var data = this.dbLib.getDataProvider("select nama from fi_anggota "+
			                                      "where kode_agg = '"+this.cb_agg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'",true);												
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];													
				this.e_nama.setText(line.nama);										
			} 									
			
			this.sg.clear();
			var strSQL = "select no_kunj,no_final,convert(varchar,tanggal,103) as tgl,tanggal,periode,jam from fi_kunj_m where kode_agg='"+this.cb_agg.getText()+"' and kode_pp='"+this.app._kodePP+"' and periode='"+this.e_periode.getText()+"' order by tanggal desc";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_kunj,line.periode,line.tgl,line.jam,line.no_final]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);					
		}	
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (sender.cells(0,row) != "") {
				this.noKunj = sender.cells(0,row);
				this.dp_d1.setText(sender.cells(2,row));
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.sg1.clear();				
				var strSQL = "select a.kode_param,a.nama,a.satuan,b.hasil_bef,b.hasil_aft from fi_param a left join fi_kunj_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							 "where b.no_kunj='"+sender.cells(0,row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by a.kode_param";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama,line.satuan,line.hasil_bef,line.hasil_aft]);
					}
				} else this.sg1.clear(1);	
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
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
				this.pc2.show();   
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
			this.sg1.clear(1); this.sg.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	}
});