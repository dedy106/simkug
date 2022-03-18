window.app_saku3_transaksi_tu_proyekbaru_fPrPdptShare = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fPrPdptShare.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fPrPdptShare";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Sharing Pendapatan Proyek", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		

		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Sharing","List Sharing"]});
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
			colTitle:["No Bukti","Tanggal","ID Proyek","Deskripsi","Nilai"],
			colWidth:[[4,3,2,1,0],[100,250,200,80,100]],colFormat:[[4],[cfNilai]],readOnly:true,
			dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Sharing",click:[this,"doLoad3"]});


		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});					
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
        this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"ID Proyek", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
        this.e_nilaipro = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Nilai Proyek", readOnly:true,tag:1, tipeText:ttNilai, text:"0"});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Saldo Pendapatan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
        this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Sharing", tag:1, tipeText:ttNilai, text:"0"});
        this.cb_pp2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"PP / Unit Sharing", multiSelection:false, maxLength:10, tag:1});	
        this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Kode Akun", multiSelection:false, maxLength:20, tag:1});
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Kode DRK", multiSelection:false, maxLength:20, tag:1});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:20, tag:2});
				
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
            this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi ='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"' and a.flag_aktif='1' ",["kode_pp","nama"],false,["Kode PP","Nama"],"and","Data PP",true);            
            this.cb_pp2.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["kode_pp","nama"],false,["Kode PP","Nama"],"and","Data PP",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and jenis='Pendapatan' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Data Akun",true);													
			this.cb_drk.setSQL("select distinct kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.app._periode.substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);		
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPrPdptShare.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPrPdptShare.implement({
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
			if(this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PDS"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if(this.stsSimpan == 0){
                        sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                        sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                        sql.add("delete from prb_pdpt_share where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}								
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','PDSHARE','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','"+this.cb_app.getText()+"','-','-','"+this.cb_proyek.getText()+"','-','-','-','-')");
                    
                    sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPDPT+"','D',"+parseNilai(this.e_nilai.getText())+","+
                            parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','AR','PDPT','IDR',1,'"+this.cb_pp.getText()+"','"+this.drkP+"','-','-','-','-','-','-','-')");	
                            
                    sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_akun.getText()+"','C',"+parseNilai(this.e_nilai.getText())+","+
                            parseNilai(this.e_nilai.getText())+",'"+this.e_ket.getText()+"','AR','PDPT','IDR',1,'"+this.cb_pp2.getText()+"','"+this.cb_drk.getText()+"','-','-','-','-','-','-','-')");	
                            
                    sql.add("insert into prb_pdpt_share (no_bukti,kode_lokasi,tgl_input,nik_user,periode,kode_pp,tanggal,keterangan,nilai_share,id_proyek,pp_share,akun_pdpt,kode_drkp) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_proyek.getText()+"','"+this.cb_pp2.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"')");
                            
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";				
							
				if (nilaiToFloat(this.e_nilai.getText()) <= 0 || (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText()))) {
					system.alert(this,"Transaksi tidak valid.","Nilai Sharing tidak boleh nol atau kurang atau melebihi saldo.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {		
					uses("server_util_arrayList");
                    var sql = new server_util_arrayList();
                    
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                    sql.add("delete from prb_pdpt_share where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if(this.stsSimpan == 1) this.doClick();
	},				
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PDS"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_pp && this.cb_pp.getText()!="") {
			this.cb_proyek.setSQL("select a.kode_proyek,a.nama from prb_proyek a where a.versi='PRO20' and a.kode_pp ='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='2' ",["a.kode_proyek","a.nama"],false,["ID Proyek","Keterangan"],"and","Data Proyek",true);								
		}
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.nilai, isnull(b.saldo_pyt,0)-isnull(c.nilai_s,0) as saldo ,a.kode_jenis "+
            "from prb_proyek a "+
            "left join (select kode_proyek,kode_lokasi,sum( case dc when 'D' then nilai else -nilai end) as saldo_pyt "+
            "           from prb_prpyt_d "+
            "           group by kode_proyek,kode_lokasi) b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
            "left join (select id_proyek,kode_lokasi,sum(nilai_share) as nilai_s "+
            "           from prb_pdpt_share "+
            "           where no_bukti <> '"+this.e_nb.getText()+"' "+
            "           group by id_proyek,kode_lokasi) c on a.kode_proyek=c.id_proyek and a.kode_lokasi=b.kode_lokasi "+
            "where a.versi='PRO20' and a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
                    this.e_nilaipro.setText(floatToNilai(line.nilai));
                    this.e_saldo.setText(floatToNilai(line.saldo));	

                    var data2 = this.dbLib.getDataProvider("select kode_jenis,akun_pdpt, kode_drkp from prb_proyek_jenis "+
                    "where kode_jenis='"+line.kode_jenis+"' and kode_lokasi='"+this.app._lokasi+"'",true);
                    if (typeof data2 == "object"){
                        var line2 = data2.rs.rows[0];	                        
                        if (line2 != undefined){
                            this.cb_akun.setText(line2.akun_pdpt);
                            this.cb_drk.setText(line2.kode_drkp);	
                            this.akunPDPT = line2.akun_pdpt;
                            this.drkP = line2.kode_drkp;
                        }
                    }
				} 
            }  
            
            if(this.stsSimpan == 0){
                var data3 = this.dbLib.getDataProvider("select akun_pdpt, kode_drkp from prb_pdpt_share "+
                    "where no_bukti='"+this.e_nb.getText()+"' and id_proyek ='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
                if (typeof data3 == "object"){
                    var line3 = data3.rs.rows[0];	 
                    if (line3 != undefined){
                        this.cb_akun.setText(line3.akun_pdpt);
                        this.cb_drk.setText(line3.kode_drkp);	
                    }
                }
            }
           
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if(this.preView == "1"){
								this.nama_report="server_report_saku3_tu_proyek_rptPdptShare";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
								this.pc2.hide();
								this.allBtn = false;		
							}else{
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}					
												
						}else system.info(this,result,"");
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
				this.viewer.setVisible(false);
				this.pc2.show();
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select no_bukti, convert(varchar,tanggal,103) as tgl, keterangan, id_proyek,nilai_share from prb_pdpt_share where kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.app._userLog+"' ";						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.id_proyek,line.keterangan,floatToNilai(line.nilai_share)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
                var data = this.dbLib.getDataProvider("select a.keterangan,a.tanggal, a.kode_pp, a.id_proyek, a.nilai_share, a.pp_share, a.akun_pdpt, a.kode_drkp,b.nik2 "+
                       "from prb_pdpt_share a inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_proyek.setText(line.id_proyek);
                        this.cb_pp.setText(line.kode_pp);
                        this.cb_pp2.setText(line.pp_share);
						this.e_nilai.setText(floatToNilai(line.nilai_share));
						this.cb_app.setText(line.nik2);
						
					} 
				}			
				
			}									
		} catch(e) {alert(e);}
	}
});