window.app_saku3_transaksi_ypt_logistik_fFaPerawatan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fFaPerawatan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fFaPerawatan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perawatan Aktiva Tetap", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Perawatan", underline:true});
        this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 	
        
        this.pc2 = new pageControl(this,{bound:[5,10,1000,470], childPage:["Data Perawatan","List Perawatan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[390,180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Perawatan",click:[this,"doLoad3"]});				

        this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
        this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
        this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen",maxLength:20, tag:1});	
        this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,432,20],caption:"Deskripsi",maxLength:200, tag:1});
        this.cb_nofa = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"No Aktiva Tetap", multiSelection:false, tag:1,change:[this,"doChange"]});
        this.e_nama = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,432,20],caption:"Nama",maxLength:150,tag:1,readOnly:true});	
        this.e_tgloleh = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Tgl Perolehan",maxLength:150,tag:1,readOnly:true});
        this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[252,17,200,20],caption:"Nilai Perolehan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
        this.e_merk = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Merk",maxLength:100, tag:1,readOnly:true});	
        this.e_tipe = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[252,18,200,20],caption:"Tipe",maxLength:100, tag:1,readOnly:true});		
		this.e_seri = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nomor Seri",maxLength:50, tag:1,readOnly:true});
       
        this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,10,990,250], childPage:["Perbaikan","History Perbaikan"]});	
        this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
            colTitle:["No Bukti","Tanggal","Keterangan"],
            colWidth:[[2,1,0],[300,100,150]],
            readOnly:true,
			dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
        this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
        this.bLoad2 = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load History",click:[this,"doLoad2"]});	
		
        this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
        this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
        this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[253,11,100,18],caption:"Tgl Selesai", underline:true});
        this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[353,11,98,18],selectDate:[this,"doSelectDate"]}); 
        this.l_tgl4 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Akhir Garansi", underline:true});
        this.dp_d4 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]});
        this.l_tgl5 = new portalui_label(this.pc1.childPage[0],{bound:[253,13,100,18],caption:"Tgl Kontrol", underline:true});
        this.dp_d5 = new portalui_datePicker(this.pc1.childPage[0],{bound:[353,13,98,18],selectDate:[this,"doSelectDate"]});
		
		this.e_gangguan = new saiMemo(this.pc1.childPage[0],{bound:[20,14,432,60],caption:"Gangguan",tag:1});
        this.e_perbaikan = new saiMemo(this.pc1.childPage[0],{bound:[20,15,432,60],caption:"Perbaikan",tag:1});
        this.e_vendor = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,432,20],caption:"Vendor / PIC",maxLength:150,tag:1});
        this.e_telp = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Telp",maxLength:150,tag:1});

        this.rearrangeChild(10, 23);
        this.pc2.childPage[0].rearrangeChild(10, 23);
        this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.stsSimpan = 1;					
			this.doSelectDate(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);
           
            this.cb_nofa.setSQL("select no_fa, nama from fa_asset where kode_lokasi='"+this.app._lokasi+"' and no_fa like '"+this.app._lokasi+"-FA%' ",["no_fa","nama"],false,["Kode","Nama"],"and","Data Asset",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fFaPerawatan.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fFaPerawatan.implement({
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
            if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_perawatan","no_bukti",this.app._lokasi+"-PR"+this.e_periode.getText().substr(2,4)+".","0000"));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if(this.stsSimpan == 0){

						sql.add("delete from fa_perawatan where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
                        
                    sql.add("insert into fa_perawatan (no_bukti,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,no_fa,tgl_mulai,tgl_selesai,tgl_garansi,tgl_kontrol,gangguan,perbaikan,vendor,no_telp) values "+
					"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_nofa.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.dp_d4.getDateString()+"','"+this.dp_d5.getDateString()+"','"+this.e_gangguan.getText()+"','"+this.e_perbaikan.getText()+"','"+this.e_vendor.getText()+"','"+this.e_telp.getText()+"')");

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
			case "ubah"	:
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fa_perawatan where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;		
		}
	},
	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1); 
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fa_perawatan","no_bukti",this.app._lokasi+"-PR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
	},
	doChange:function(sender){	
		if (sender == this.cb_nofa && this.cb_nofa.getText() != "" ) {
			var data = this.dbLib.getDataProvider(
			           "select a.nama,a.merk,a.tipe,convert(varchar,a.tgl_perolehan,103) as tgl,a.kode_akun,a.no_seri,b.nilai "+
                       "from fa_asset a "+
                       "inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai from fa_nilai group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
                    this.e_nama.setText(line.nama);	
                    this.e_seri.setText(line.no_seri);	
                    this.e_merk.setText(line.merk);
                    this.e_tipe.setText(line.tipe);
                    this.e_nilai.setText(floatToNilai(line.nilai));	
                    this.e_tgloleh.setText(line.tgl);
				} 
            } 
            this.sg.clear();
            var data2 = this.dbLib.getDataProvider(
                "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
                "from fa_perawatan a "+
                "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
            if (typeof data2 == "object"){
                for(i=0;i<data2.rs.rows.length;i++){
                    var line2 = data2.rs.rows[i];							
                    if (line2 != undefined){
                        this.sg.appendData([line2.no_bukti,line2.tgl,line2.keterangan]);
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
                            system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");				
                            this.app._mainForm.bClear.click();
                            this.sg.clear();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
    },
    doLoad3:function(sender){			
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from fa_perawatan a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan]); 
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
                
                var strSQL ="select * "+
                "from fa_perawatan a "+
                "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d2.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
                        this.cb_nofa.setText(line.no_fa);
                        this.dp_d1.setText(line.tgl_mulai);
                        this.dp_d3.setText(line.tgl_selesai);
                        this.dp_d4.setText(line.tgl_garansi);
                        this.dp_d5.setText(line.tgl_kontrol);
						this.e_gangguan.setText(line.gangguan);
						this.e_perbaikan.setText(line.perbaikan);
                        this.e_vendor.setText(line.vendor);
                        this.e_telp.setText(line.no_telp);
					}
                }

			}									
		} catch(e) {alert(e);}
    },
    doLoad2:function(sender){
        this.sg.clear();			
        var data2 = this.dbLib.getDataProvider(
                "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
                "from fa_perawatan a "+
                "where a.no_fa ='"+this.cb_nofa.getText()+"'",true);
        if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
            for(i=0;i<data2.rs.rows.length;i++){
                var line2 = data2.rs.rows[i];							
                if (line2 != undefined){
                    this.sg.appendData([line2.no_bukti,line2.tgl,line2.keterangan]);
                } 
            }                
        } else this.sg.clear(1);
            	
	},
    doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				
                var strSQL2 ="select a.tgl_mulai,a.tgl_selesai,a.tgl_garansi,a.tgl_kontrol,a.gangguan,a.perbaikan,a.vendor,a.no_telp "+
                "from fa_perawatan a "+
                "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.sg.cells(0,row)+"' ";
                var data = this.dbLib.getDataProvider(strSQL2,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
                        this.dp_d1.setText(line.tgl_mulai);
                        this.dp_d3.setText(line.tgl_selesai);
                        this.dp_d4.setText(line.tgl_garansi);
                        this.dp_d5.setText(line.tgl_kontrol);
						this.e_gangguan.setText(line.gangguan);
						this.e_perbaikan.setText(line.perbaikan);
                        this.e_vendor.setText(line.vendor);
                        this.e_telp.setText(line.no_telp);
					}
                }
			}									
		} catch(e) {alert(e);}
	}

});