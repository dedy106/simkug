window.app_saku3_transaksi_yakes21_aktap_fFasusutReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_aktap_fFasusutReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_aktap_fFasusutReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Aktiva Tetap", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,220,20],caption:"DRK Penyusutan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new portalui_button(this,{bound:[690,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[810,17,200,20],caption:"Total Penyusutan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
			
		this.pc1 = new pageControl(this,{bound:[20,12,995,333], childPage:["Item Jurnal","Controlling"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Akun BP","Nama Akun","Akun Deprs","Nama Akun","Kode PP","Nama PP","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,150,80,220,80,220,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,200,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[965,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		
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
			this.dataJU = {rs:{rows:[]}};  
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_aktap_fFasusutReg.extend(window.childForm);
window.app_saku3_transaksi_yakes21_aktap_fFasusutReg.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fasusut_m(no_fasusut,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','"+this.cb_drk.getText()+"','F','FA_SSTREG','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_drk,kode_pp,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+line.akun_bp+"','"+this.e_ket.getText()+"','D',"+line.nilai_susut+",'"+this.cb_drk.getText()+"','"+line.kode_pp_susut+"','"+this.app._lokasi+"','FA_SSTREG','BP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
						sql.add("insert into fasusut_j(no_fasusut,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_drk,kode_pp,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+line.akun_deprs+"','"+this.e_ket.getText()+"','C',"+line.nilai_susut+",'-','"+line.kode_pp_susut+"','"+this.app._lokasi+"','FA_SSTREG','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}

					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									//terpakai
									var DC = "C"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									//koreksi budget
									var DC = "D";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','FASUSUT','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
						}
					}

					sql.add("insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur) "+
							"  select '"+this.e_nb.getText()+"',a.no_fa,'"+this.e_periode.getText()+"', "+
							"	 case when (zz.nilai-a.nilai_residu-isnull(b.tot_susut,0)) > (ceiling(zz.nilai/a.umur) * (datediff(month,substring(a.periode_susut,1,4)+'-'+substring(a.periode_susut,5,2)+'-01','"+this.dp_d1.getDateString()+"')+1)) "+
							"	 	  then (ceiling(zz.nilai/a.umur) * (datediff(month,substring(a.periode_susut,1,4)+'-'+substring(a.periode_susut,5,2)+'-01','"+this.dp_d1.getDateString()+"')+1)) "+
							"		  else (zz.nilai-a.nilai_residu-isnull(b.tot_susut,0)) end as nilai_susut, "+
							"		  a.kode_lokasi,c.akun_bp,c.akun_deprs,c.kode_akun,a.kode_pp_susut,'"+this.cb_drk.getText()+"','D','-',zz.nilai,a.umur "+
							"  from fa_asset a "+
							"	 inner join fa_klpakun c on a.kode_klpakun=c.kode_klpakun "+
							
							"    inner join ("+
							"				select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"               from fa_nilai "+
							"				where periode<='"+this.e_periode.getText()+"' "+
							"				group by no_fa) zz on a.no_fa=zz.no_fa "+

							"	 left join  ("+
							"	 			select no_fa,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
							"		 		from fasusut_d "+
							"		 		group by no_fa) b on a.no_fa=b.no_fa  "+

							"  where a.umur <> 0 and a.jenis='A' and progress = '2' and (zz.nilai-a.nilai_residu) > isnull(b.tot_susut,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode_susut<='"+this.e_periode.getText()+"' ");
					
					var perNext = nextNPeriode(this.e_periode.getText(),1);
					sql.add("update a set periode_susut='"+perNext+"' "+
							"from fa_asset a inner join fasusut_d b on a.no_fa=b.no_fa "+
							"where b.no_fasusut='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg.setTag("0");
					this.dataJU = {rs:{rows:[]}};  
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :					
				this.doHitungGar();

				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyusutan tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fasusut_m","no_fasusut",this.app._lokasi+"-RSU"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_drk.setFocus();
		}
	},
	doHitungGar: function(){
        try {
            this.sg2.clear();
            var nilai = total = 0;
            for (var i=0;i < this.sg.getRowCount();i++){
                if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0"){              
                    nilai = nilaiToFloat(this.sg.cells(6,i));
                    
                    var isAda = false;
                    var idx = total = 0;
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(4,i) == this.sg2.cells(2,j) && this.cb_drk.getText() == this.sg2.cells(4,j) ) {
                            isAda = true;
                            idx = j;
                            break;
                        }
                    }
                    if (!isAda) {
                        this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(4,i),this.sg.cells(5,i),this.cb_drk.getText(),this.cb_drk.rightLabelCaption,"0",floatToNilai(nilai)]);
                    } 
                    else { 
                        total = nilaiToFloat(this.sg2.cells(7,idx));
                        total = total + nilai;
                        this.sg2.setCell(7,idx,total);
                    }
                }
            }

			for (var i=0;i < this.sg2.getRowCount();i++){               
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.sg2.cells(6,i,floatToNilai(line.saldo));                       
				}
			}
        }
        catch(e) {
            alert(e);
        }
    },  
	doLoadData: function(sender){
		if (this.cb_drk.getText() != "") {			
			this.e_nilai.setText("0");	
			//jenis aset nempel di FAASET tidak dikelompok , karena utk OPEX kodenya sama (pakai akun_opex)			
			var strSQL = "select b.akun_bp,x.nama as nama_bp,b.akun_deprs,y.nama as nama_deprs,a.kode_pp_susut,c.nama as nama_pp, "+
						 "		 sum("+
						 "		 case when (zz.nilai-a.nilai_residu-isnull(d.tot_susut,0)) > (ceiling(zz.nilai/a.umur) * (datediff(month,substring(a.periode_susut,1,4)+'-'+substring(a.periode_susut,5,2)+'-01','"+this.dp_d1.getDateString()+"')+1)) "+
						 "		 then (ceiling(zz.nilai/a.umur) * (datediff(month,substring(a.periode_susut,1,4)+'-'+substring(a.periode_susut,5,2)+'-01','"+this.dp_d1.getDateString()+"')+1)) "+
						 "		 else ceiling(zz.nilai-a.nilai_residu-isnull(d.tot_susut,0)) end "+
						 "		 ) as nilai_susut "+

						 "from fa_asset a "+
						 "inner join ("+
						 "			  select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "            from fa_nilai where periode<='"+this.e_periode.getText()+"'  "+
						 "			  group by no_fa "+
						 "			  ) zz on a.no_fa=zz.no_fa "+

						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
						 "inner join pp c on a.kode_pp_susut=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.akun_bp=x.kode_akun and x.kode_lokasi='"+this.app._lokasi+"' "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and y.kode_lokasi='"+this.app._lokasi+"' "+
						 
						 "left join ("+
						 "   		  select no_fa,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  		  from fasusut_d group by no_fa "+
						 "			 ) d on a.no_fa=d.no_fa "+					 

						 "where a.umur <> 0 and a.jenis='A' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (zz.nilai-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut <= '"+this.e_periode.getText()+"' "+
						 "group by b.akun_bp,b.akun_deprs,a.kode_pp_susut,c.nama,x.nama,y.nama "+
						 "order by b.akun_bp";
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.nilai_susut);												
				}		
				
				this.e_nilai.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);
			} else this.sg.clear(1);				

			this.doHitungGar();
		}
		else {
			system.alert(this,"DRK harus valid.","Isi DRK untuk anggaran");					
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU = {rs:{rows:[]}};  
			this.sg.clear(1); 			
			this.e_ket.setText("Penyusutan Bulan ");

			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('DRKSUSUT')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																												
					if (line.kode_spro == "DRKSUSUT") {
						this.cb_drk.setText(line.flag);
					}
				}
			}

		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_bp,line.nama_bp,line.akun_deprs,line.nama_deprs,line.kode_pp_susut,line.nama_pp,floatToNilai(line.nilai_susut)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							// this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
							// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();								
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
			this.sg.setTag("0");
			this.dataJU = {rs:{rows:[]}};  
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});