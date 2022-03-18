window.app_saku3_transaksi_fitnes_fFinalGizi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fFinalGizi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fFinalGizi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Gizi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["Data Finalisasi"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		this.cb_agg = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"ID Peserta", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,400,20],caption:"Nama", readOnly:true});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,340], childPage:["Daftar Kunjungan","Status Gizi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:0,
		            colTitle:["No Kunj","Periode","Tanggal","Jam","No Final"],
					colWidth:[[4,3,2,1,0],[200,100,100,80,200]],					
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});						
		
		this.e_umur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Usia", readOnly:true});	
		this.e_goldar = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,11,200,20],caption:"Golongan Darah", readOnly:true});				
		this.e_td = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Tekanan Darah", readOnly:true});	
		this.e_rsakit = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,12,500,20],caption:"Riwayat Penyakit", maxLength:200});
		
		this.e_tb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Tinggi Badan", maxLength:10, tipeText:ttNilai,text:"0",change:[this,"doChange"]});	
		this.e_bb = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,13,200,20],caption:"Berat Badan", maxLength:10, tipeText:ttNilai,text:"0",change:[this,"doChange"]});	
		this.e_bmi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"BMI", maxLength:10, tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});	
		this.e_status = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,14,200,20],caption:"Status Gizi", readOnly:true});
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,800,150],caption:"Catatan",tag:9,readOnly:true});
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		

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
			
			var data = this.dbLib.getDataProvider("select kode_spro,value1,value2 from spro where kode_spro in ('FIBMI') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "FIBMI") {
						this.batasBawah = parseFloat(line.value1);	
						this.batasAtas = parseFloat(line.value2);	
					}
				}
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fFinalGizi.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fFinalGizi.implement({	
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
					else {
						sql.add("delete from fi_kunj_gizi where no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update fi_kunj_m set no_final='"+this.e_nb.getText()+"' where no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("insert into fi_kunj_gizi(no_kunj,no_final,kode_lokasi,tb,bb,bmi,status_gizi,catatan,nik_user) values "+
							"('"+this.noKunj+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_tb.getText())+","+parseNilai(this.e_bb.getText())+","+parseNilai(this.e_bmi.getText())+",'"+this.e_status.getText()+"','"+this.e_memo.getText()+"','"+this.app._userLog+"')");		
											
					sql.add("update fi_kunj_d set hasil_aft='"+this.e_bb.getText()+"' where kode_param='P02' and no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");		
					sql.add("update fi_kunj_d set hasil_aft='"+this.e_tb.getText()+"' where kode_param='P20' and no_kunj='"+this.noKunj+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
				    this.sg.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbSimpan);	
					this.e_memo.setText("");					
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
		try {
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
			if ((sender == this.e_tb || sender == this.e_bb) && this.e_tb.getText() != "" && this.e_tb.getText() != "0" && this.e_bb.getText() != "" && this.e_bb.getText() != "0") {
				if (this.e_bb.getText()!="0" && this.e_tb.getText()!="0") {
					var bb = nilaiToFloat(this.e_bb.getText());
					var tb = nilaiToFloat(this.e_tb.getText()) / 100;
					var tb2 = tb * tb;
					var bmi = bb / tb2;
				
					bmi = Math.round(bmi * 100) / 100;
					this.e_bmi.setText(floatToNilai(bmi));
				}
			}
			if (sender == this.e_bmi && this.e_bmi.getText() != "") {
				this.e_status.setText("NORMAL");
				if (nilaiToFloat(this.e_bmi.getText()) < this.batasBawah) this.e_status.setText("UNDERWEIGHT");
				if (nilaiToFloat(this.e_bmi.getText()) > this.batasAtas) this.e_status.setText("OVERWEIGHT");
			}
		}
		catch(e) {alert(e);}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (sender.cells(0,row) != "") {
				this.noKunj = sender.cells(0,row);
				this.dp_d1.setText(sender.cells(2,row));
				this.pc1.setActivePage(this.pc1.childPage[1]);
				
				var tgl = sender.cells(2,row).substr(6,4) +"-"+ sender.cells(2,row).substr(3,2) +"-"+ sender.cells(2,row).substr(0,2);
				var data = this.dbLib.getDataProvider("select goldar,r_sakit,datediff(YEAR,tgl_lahir,'"+tgl+"')  as umur from fi_anggota where kode_agg='"+this.cb_agg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					this.e_umur.setText(floatToNilai(line.umur));								
					this.e_rsakit.setText(line.r_sakit);	
					this.e_goldar.setText(line.goldar);											
				}
				
				var data = this.dbLib.getDataProvider("select kode_param, (case when hasil_aft <> '-' then hasil_aft else hasil_bef end) as hasil "+
				      						          "from fi_kunj_d "+
				                                      "where no_kunj='"+sender.cells(0,row)+"' and kode_param in ('P01','P02','P20') and kode_lokasi = '"+this.app._lokasi+"'",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						if (line.kode_param == "P01") this.e_td.setText(line.hasil);
						if (line.kode_param == "P02") this.e_bb.setText(line.hasil);
						if (line.kode_param == "P20") this.e_tb.setText(line.hasil);
						
					}
				}	
				
				var data = this.dbLib.getDataProvider("select catatan from fi_kunj_gizi "+
				                                      "where no_kunj='"+sender.cells(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					this.e_memo.setText(line.catatan);										
				}
				
					
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
			this.sg.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);	
			this.e_memo.setText("");					
		} catch(e) {
			alert(e);
		}
	}
});