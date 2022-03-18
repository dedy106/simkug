window.app_saku3_transaksi_kopeg_fKartuPinjSawal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kopeg_fKartuPinjSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kopeg_fKartuPinjSawal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Pinjaman", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["No Kartu","No Agg","Nama","Jenis","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,250,100,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.cb_agg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Anggota",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		this.c_jenis = new portalui_saiCB(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Jenis Angsuran",items:["FLAT","ANUITAS"],tag:2,readOnly:true, change:[this,"doChange"]});
		this.cb_status = new portalui_saiCB(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Status Bayar",items:["PGAJI","TUNAI"],tag:2,readOnly:true});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,300], childPage:["Data Pinjaman","Schedule Angsuran"]});		
		this.cb_pinj = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Jenis Pinjaman",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai Pinjaman", tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[320,29,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_bunga = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,31,200,20],caption:"Bunga(%) / Tahun",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		
		this.e_jumbayar = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[320,31,200,20],caption:"Jumlah Bayar",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		
		this.e_materai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,32,200,20],caption:"Biaya Materai",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_provisi = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,33,200,20],caption:"Biaya Provisi",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_asur = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,34,200,20],caption:"Biaya Asuransi",tipeText:ttNilai,text:"0", change:[this,"doChange"]});
		this.e_biaya = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[320,34,200,20],caption:"Total Biaya-Biaya",tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_terima = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,35,200,20],caption:"Nilai Diterima",tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_bungaBln = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,36,200,20],caption:"Nilai Bunga/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_tagihan = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[320,36,200,20],caption:"Nilai Tagihan/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_pokokBln = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,37,200,20],caption:"Nilai Pokok/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
		this.e_piutang = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[320,37,200,20],caption:"Nilai Piutang Awal",tipeText:ttNilai, readOnly:true, text:"0"});
							
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:0,
				colTitle:["Saldo Awal","Pokok","Margin","Saldo Akhir","Tgl Tagih"],
				colWidth:[[4,3,2,1,0],[80,80,80,80,80]],
				columnReadOnly:[true,[0,1,2,3,4],[]],				
				colFormat:[[0,1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai,cfDate]],																
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			
			this.cb_agg.setSQL("select no_agg,nama from kop_agg where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);						
			this.cb_pinj.setSQL("select kode_param,nama from kop_pinj_param where kode_lokasi = '"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Parameter",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kopeg_fKartuPinjSawal.extend(window.portalui_childForm);
window.app_saku3_transaksi_kopeg_fKartuPinjSawal.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kop_pinj_m where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from kop_pinjangs_d where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjbill_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into kop_pinj_m (no_pinj,keterangan,tanggal,periode,no_agg,status_bayar,jenis_angs,nilai,p_bunga,lama_bayar,nilai_mat,nilai_prov,nilai_asur,nilai_bunga,nilai_pokok,nilai_tagihan, akun_piutang,akun_pjasa,nik_app,status_aktif,nik_user,tgl_input,kode_lokasi,no_kas,no_kasasur,kode_param) values "+
					        "('"+this.e_nb.getText()+"','Pinjaman a.n "+this.cb_agg.rightLabelCaption+"','"+this.dp_d1.getDateString()+"','"+thnBln+"','"+this.cb_agg.getText()+"','"+this.cb_status.getText()+"','"+this.c_jenis.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_bunga.getText())+","+nilaiToFloat(this.e_lama.getText())+","+nilaiToFloat(this.e_materai.getText())+","+nilaiToFloat(this.e_provisi.getText())+","+nilaiToFloat(this.e_asur.getText())+","+nilaiToFloat(this.e_bungaBln.getText())+","+nilaiToFloat(this.e_pokokBln.getText())+","+nilaiToFloat(this.e_tagihan.getText())+",'"+this.akunPiutang+"','"+this.akunPjasa+"','"+this.app._userLog+"','1','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.cb_pinj.getText()+"')");
					
					var j = 0; 				  
					for (var i=0; i < this.sg.rows.getLength(); i++){
					  j = i+1;					
					  					  
					  if (j <= nilaiToFloat(this.e_jumbayar.getText())) {
					  	var noBill = this.e_nb.getText()+"-"+j.toString();					  	
					  	
					  	sql.add("insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
								"('"+noBill+"','"+this.e_nb.getText()+"','-','"+this.sg.getCell(4,i).substr(6,4)+'/'+this.sg.getCell(4,i).substr(3,2)+'/'+this.sg.getCell(4,i).substr(0,2)+"',"+nilaiToFloat(this.e_tagihan.getText())+",'"+this.sg.getCell(4,i).substr(6,4)+this.sg.getCell(4,i).substr(3,2)+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENBILL')");
						
						
						sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,modul,periode,kode_lokasi,posted,kode_pp,nik_app,nik_user,tgl_input,no_kas) values  "+
							"('"+noBill+"','"+this.e_nb.getText()+"','-','"+this.sg.getCell(4,i).substr(6,4)+'/'+this.sg.getCell(4,i).substr(3,2)+'/'+this.sg.getCell(4,i).substr(0,2)+"',"+nilaiToFloat(this.e_tagihan.getText())+",0,0,'PJANGS','"+this.sg.getCell(4,i).substr(6,4)+this.sg.getCell(4,i).substr(3,2)+"','"+this.app._lokasi+"','X','"+this.app._kodePP+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+noBill+"')");					
					  	sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_bill,akun_piutang,akun_pjasa,npokok,nbunga,kode_lokasi,dc,periode,cicilan_ke,modul,no_agg) values "+
								"('"+noBill+"','"+this.e_nb.getText()+"','"+noBill+"','"+this.akunPiutang+"','"+this.akunPjasa+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','D','"+this.sg.getCell(4,i).substr(6,4)+this.sg.getCell(4,i).substr(3,2)+"',"+j+",'PJTUNAI','"+this.cb_agg.getText()+"')");					
					  }
					  else var noBill = "-";
					  
					  sql.add("insert into kop_pinj_sch(no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill) values "+
						      "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+","+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.sg.getCell(4,i).substr(6,4)+'/'+this.sg.getCell(4,i).substr(3,2)+'/'+this.sg.getCell(4,i).substr(0,2)+"','"+this.sg.getCell(4,i).substr(6,4)+this.sg.getCell(4,i).substr(3,2)+"','"+noBill+"')");				
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
				}
				break;
			
			case "simpan" :	
			case "ubah" :	
			
				if (nilaiToFloat(this.e_lama.getText()) < nilaiToFloat(this.e_jumbayar.getText())) {
					system.alert(this,"Transaksi tidak valid.","Jumlah Bayar melebihi Lama Bayar");
					return false;						
				}
				this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kop_pinj_m where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kop_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("delete from kop_pinjangs_d where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kop_pinjangs_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from kop_pinjbill_m where no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_pinj && this.cb_pinj.getText()!="") {
				var strSQL = "select akun_piutang,akun_pjasa from kop_pinj_param "+
							 "where kode_param = '"+this.cb_pinj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.akunPiutang = line.akun_piutang;
						this.akunPjasa = line.akun_pjasa;
					}
				}
			}
			
			if (sender == this.cb_agg && this.cb_agg.getText()!=""&& this.stsSimpan == 1) this.e_nb.setText("");			
			
			if (sender == this.e_materai || sender == this.e_provisi || sender == this.e_asur) {
				if (this.e_materai.getText() != "" && this.e_provisi.getText() != "" && this.e_asur.getText() != "") 
					this.e_biaya.setText(floatToNilai(nilaiToFloat(this.e_materai.getText()) + nilaiToFloat(this.e_provisi.getText()) + nilaiToFloat(this.e_asur.getText()) ));				
				
				if (this.e_nilai.getText() != "" && this.e_biaya.getText() != "") 
					this.e_terima.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_biaya.getText())));				
				
			}
			
			if (sender == this.c_jenis || sender == this.e_nilai || sender == this.e_bunga || sender == this.e_lama) {
				if ((this.e_lama.getText() != "0") && (this.e_nilai.getText() != "0") && (this.e_bunga.getText() != "0") && (this.e_lama.getText() != "") && (this.e_nilai.getText() != "") && (this.e_bunga.getText() != "") ) 
					this.generateSch();	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinj_m","no_pinj",this.app._lokasi+"-PJ"+this.cb_agg.getText()+".","0000"));		
		    this.dp_d1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
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
								this.filter2 = "";
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
								this.pc1.hide();   
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
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		if (this.cb_agg.getText() == "") var filter = ""; else var filter = "a.no_agg = '"+this.cb_agg.getText()+"' and ";		
		var strSQL = "select a.no_pinj,a.no_agg,c.nama,a.jenis_angs,a.nilai "+
		             "from kop_pinj_m a "+					 					 
					 "                  inner join kop_agg c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi "+
					 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_pinj,line.no_agg,line.nama,line.jenis_angs,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from kop_pinj_m "+							 
							 "where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_agg.setText(line.no_agg);
						this.cb_pinj.setText(line.kode_param);
						this.c_jenis.setText(line.jenis_angs);					
						this.dp_d1.setText(line.tanggal);
						this.cb_status.setText(line.status_bayar);
						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_lama.setText(floatToNilai(line.lama_bayar));						
						this.e_bunga.setText(floatToNilai(line.p_bunga));						
						this.e_materai.setText(floatToNilai(line.nilai_mat));						
						this.e_provisi.setText(floatToNilai(line.nilai_prov));						
						this.e_asur.setText(floatToNilai(line.nilai_asur));												
					}
				}	
				this.generateSch();
			}									
		} catch(e) {alert(e);}
	},	
	generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.e_lama.getText());
    		var so = nilaiToFloat(this.e_nilai.getText());
    		var bunga = nilaiToFloat(this.e_bunga.getText());				
    		var pokok = Math.round(so / lm);
    		var margin = Math.round(so * bunga / 100 / 12);
    		var tot = so + (margin * lm);
    		var angs = Math.round(tot / lm);
    		var pay = so;
    		this.e_piutang.setText(floatToNilai(so+margin));
    		this.e_tagihan.setText(floatToNilai(angs));
			
			var tglNext = perAwal = this.dp_d1.getThnBln();
			var tgl = this.dp_d1.getText().substr(0,2);
			if (parseInt(tgl) > 28) tgl = "28";
            this.dataAngsuran = [];
            this.sg.clear();
    		for (var i = 0;i < lm;i++){
				tglNext = tgl + '/' + perAwal.substr(4,2) + '/' +  perAwal.substr(0,4);
    			if (this.c_jenis.getText() == "FLAT"){								
    				this.dataAngsuran.push([floatToNilai(so),floatToNilai(pokok),floatToNilai(margin),floatToNilai(so - pokok),tglNext]);
    				so = so - pokok;
    				if (so < pokok) pokok = so;
    				else if ( i == lm - 2) pokok = so; 
    			}else{					
    				var value = annuity(bunga /12 / 100, lm - i, lm, so);					
    				eval("value = "+value+";");
                    this.dataAngsuran.push([floatToNilai(value.totPayment),floatToNilai(value.pokok),floatToNilai(value.margin),floatToNilai(value.totPayment - value.pokok),tglNext]);
    				this.e_tagihan.setText(floatToNilai(value.payment));
    				pokok = value.pokok;
    				margin = value.margin;
    			}
    			if (i == 0) {
                    this.e_bungaBln.setText(floatToNilai(margin));
                    this.e_pokokBln.setText(floatToNilai(pokok));
                }
                perAwal = getNextPeriode(perAwal);
				this.sg.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
    }
});