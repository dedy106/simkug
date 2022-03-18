window.app_saku3_transaksi_yakes21_ifund_fDisIF = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_ifund_fDisIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_ifund_fDisIF";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Distribusi Pemegang IF", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					readOnly:true,
					colFormat:[[3,4],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Lok. Imprest Fund", multiSelection:false, tag:1,change:[this,"doChange"]});
		this.cb_if = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Pemegang IF",tag:2,readOnly:true,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_nilaiif = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nokas = new saiLabelEdit(this.pc2.childPage[0],{bound:[230,18,200,20],caption:"No BuktiKas", tag:1, readOnly:true});
		this.e_saldoif = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_totdis = new saiLabelEdit(this.pc2.childPage[0],{bound:[230,19,200,20],caption:"Total Distribusi", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,305], childPage:["Distribusi"]});	
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
					colTitle:["NIK","Nama","Nilai Distribusi"],
					colWidth:[[2,1,0],[100,200,100]],					
					columnReadOnly:[true,[0,1],[2]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]], pasteEnable: true,
					ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
							        
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
			this.stsSimpan = 1;			

			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_ifund_fDisIF.extend(window.childForm);
window.app_saku3_transaksi_yakes21_ifund_fDisIF.implement({		
	doAfterPaste: function(sender,totalRow){
		try {			
			for (var i=0;i < this.sg1.rows.getLength();i++){						
				var data = this.dbLib.getDataProvider("select nama from karyawan where nik='"+this.sg1.cells(0,i)+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.sg1.cells(1,i,line.nama);
					}
					else this.sg1.cells(1,i,"");
				}
			}
			
		} catch(e) {alert(e);}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 ) && (this.sg1.cells(2,row) != "")) this.sg1.validasi();				
	},		
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
						    "select a.nik,a.nama from (select a.nik,a.nama from karyawan a left join (select nik from if_nik where flag_aktif='1') b on a.nik=b.nik where b.nik is null and a.flag_aktif= '1') a ",
							"select count(a.nik) from (select a.nik from karyawan a left join (select nik from if_nik where flag_aktif='1') b on a.nik=b.nik where b.nik is null and a.flag_aktif= '1' ) a ",
							["a.nik","a.nama"],"where",["NIK","Nama"],false);				
				}									
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange1: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(2,i));					
				}
			}
			this.e_totdis.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange1:"+e);
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var nilaiBaru = nilaiToFloat(this.e_nilaiif.getText()) - nilaiToFloat(this.e_totdis.getText()); 
					sql.add("update if_nik set nilai= "+nilaiBaru+" where nik='"+this.cb_if.getText()+"' and no_kas='"+this.noKasOpen+"' and flag_aktif='1' ");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								sql.add("insert into if_nik(nik,kode_lokasi,kode_pp,nilai,flag_aktif,periode,no_kas,akun_if,no_flag,keterangan,nik_app, bank_trans,bank,no_rek,nama_rek, jenis,status_sub) "+
										"select '"+this.sg1.cells(0,i)+"',b.kode_lokasi,b.kode_pp,"+nilaiToFloat(this.sg1.cells(2,i))+",a.flag_aktif,a.periode,a.no_kas,a.akun_if,a.no_flag,a.keterangan,'-', '-',b.bank,b.no_rek,b.nama_rek, a.jenis,'SUBIF' "+
										"from if_nik a inner join karyawan b on b.nik='"+this.sg1.cells(0,i)+"' "+
										"where a.nik='"+this.cb_if.getText()+"' and a.no_kas='"+this.e_nokas.getText()+"' and a.flag_aktif='1' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");						    			
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
		try {
			if (modalResult != mrOk) return false;
			switch (event){
				case "clear" :
					if (modalResult == mrOk)
						this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);										
						setTipeButton(tbSimpan);
						this.sg1.clear(1);
						this.pc2.setActivePage(this.pc2.childPage[0]);					
					break;
				case "simpan" :							
					var temu = 0;
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.cells(0,i) != "") {
							for (var j=i;j < this.sg1.getRowCount();j++){
								
								if (this.sg1.cells(0,j) != "") {
									if ((this.sg1.cells(0,i) == this.sg1.cells(0,j))  && (i!=j)) {
										temu = 1;																
									}
									
									if (this.cb_if.getText() == this.sg1.cells(0,j)) {
										temu = 1;																
									}
								}

							}
						}
					}

					if (temu == 1) {
						system.alert(this,"Transaksi tidak valid.","NIK distribusi duplikasi.");
						return false;
					}

					if (nilaiToFloat(this.e_totdis.getText()) > nilaiToFloat(this.e_saldoif.getText())) {
						system.alert(this,"Transaksi tidak valid.","Total Distribusi tidak boleh melebihi dengan Saldo IF.");
						return false;
					}							
					else 
					this.simpan();
					break;							
			}
		}
		catch(e) {
			alert(e);
		}
	},		
	doChange:function(sender){
		try {			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText()!="") {
				this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
								"	inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
								"	inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  "+
								"where c.kode_lokasi='"+this.cb_lokasi.getText()+"'",
				["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			}

			if (sender == this.cb_if && this.cb_if.getText()!="") {
				var strSQL = "select a.nik,b.no_kas from karyawan a "+
							"		inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
							"		inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  "+
							"where c.kode_lokasi='"+this.cb_lokasi.getText()+"' and b.nik='"+this.cb_if.getText()+"' ";							  
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.noKasOpen = line.no_kas;						
						this.nikIF = this.cb_if.getText();
						this.e_nokas.setText(line.no_kas);
					}
				}

				var strSQL = "select a.nik_app,a.nilai - isnull(b.pakai,0) as saldo,a.nilai as nilai_if  "+
							"from if_nik a "+

							"		left join  ("+						
							"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
							"			 from if_aju_m a "+
							"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
							"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'  "+
							"			 group by a.nik_if,a.kode_lokasi "+												
							"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

							"where a.jenis='OPERASIONAL' and a.no_kas='"+this.noKasOpen+"' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' and a.flag_aktif='1'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nilaiif.setText(floatToNilai(line.nilai_if));	
						this.e_saldoif.setText(floatToNilai(line.saldo));											
					}
				}
			}	
		}
		catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});